//
//  Assignment.swift
//  plannerios
//
//  Created by Nathan Wiebe on 9/4/26.
//

import SwiftUI


struct Assignment: View{
    let id: Int
    let name: String
    let course: String
    let isComplete: Bool = false
    
    var body: some View{
        HStack{
            Image(systemName: "folder.circle")
                .font(.largeTitle)
                .frame(width: 50)
            VStack(alignment: .leading, spacing: 2) {
                Text("\(name)")
                    //.font(.title)
                    .lineLimit(1)
                    .truncationMode(.tail)
                Text("\(course)")
                    .lineLimit(1)
                    .truncationMode(.tail)
            }
            .layoutPriority(1)
            Spacer()
            Image(systemName: isComplete ? "checkmark.circle.fill" : "checkmark.circle")
                .font(.largeTitle)
        }
        .foregroundStyle(Color.white)
        
        .padding()
        .background{
            RoundedRectangle(cornerRadius: 12)
                .foregroundStyle(.tint)
                .opacity(0.25)
                .brightness(-0.4)
        }

        .padding()
    }
}
#Preview {
    Assignment(id: 1, name: "Artificial Intelligence", course: "Social Implications of Computers")
}

